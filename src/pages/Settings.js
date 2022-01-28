import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Settings = () => {
  const [tags, setTags] = useState([])
  const [type, setType] = useState('list')
  const [selectedTag, setSelectedTag] = useState({
    tag: '',
    responses: [],
    patterns: [],
  })
  const [addValue, setAddValue] = useState('')
  const [editValues, setEditValues] = useState({
    oldTag: '',
    newTag: '',
    responses: [],
    patterns: [],
  })

  const getTags = () => {
    axios.get(`${process.env.REACT_APP_API}/intent`).then((res) => {
      if (res?.status === 200) {
        console.log(res?.data)
        setTags(res?.data)
      }
    })
  }
  const deleteTag = (tag) => {
    axios
      .post(`${process.env.REACT_APP_API}/intent/delete`, {
        tag: tag,
      })
      .then((res) => {
        if (res?.status === 200) {
          getTags()
        }
      })
  }
  const addTag = (tag) => {
    axios.post(`${process.env.REACT_APP_API}/intent`, { tag }).then((res) => {
      if (res?.status === 200) {
        getTags()
      }
    })
  }

  const editTag = (data) => {
    axios.put(`${process.env.REACT_APP_API}/intent`, data).then((res) => {
      if (res?.status === 200) {
        getTags()
      }
    })
  }
  useEffect(() => {
    getTags()
  }, [])

  return type === 'list' ? (
    <div className="container">
      <div className="row justify-content-md-center">SETTINGS</div>
      {/* START FROM HERE */}
      <div
        onClick={() => {
          setType('add')
        }}
      >
        ADD
      </div>
      <div>
        {tags?.map((tag) => {
          return (
            <div>
              <div>{tag.tag}</div>
              <div
                onClick={() => {
                  setSelectedTag(tag)
                  setEditValues((editValues) => {
                    return {
                      ...editValues,
                      responses: tag.responses,
                      patterns: tag.patterns,
                    }
                  })
                  setType('edit')
                }}
              >
                edit
              </div>
              <div
                onClick={() => {
                  deleteTag(tag.tag)
                }}
              >
                delete
              </div>
            </div>
          )
        })}
      </div>
      {/* END HERE */}
    </div>
  ) : type === 'add' ? (
    <div>
      <div
        onClick={() => {
          setType('list')
        }}
      >
        Close
      </div>
      <div>
        <input
          onChange={(e) => {
            setAddValue(e.target.value)
          }}
          value={addValue}
        />
        <div
          onClick={() => {
            if (addValue) {
              addTag(addValue)
            }
          }}
        >
          ADD
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div
        onClick={() => {
          setType('list')
        }}
      >
        Close
      </div>
      <div>
        <div>tag:</div>
        <input
          value={editValues.newTag}
          onChange={(e) => {
            setEditValues((editValues) => {
              return { ...editValues, newTag: e.target.value }
            })
          }}
        />
      </div>
      <div>patterns:</div>
      {editValues?.patterns?.map((pattern, i) => {
        return (
          <input
            value={pattern}
            onChange={(e) => {
              setEditValues((editValues) => {
                return {
                  ...editValues,
                  patterns: editValues.patterns.map((zone, x) => {
                    if (x === i) {
                      return e.target.value
                    } else {
                      return zone
                    }
                  }),
                }
              })
            }}
          />
        )
      })}
      <div
        onClick={() => {
          setEditValues((editValues) => {
            let newPatterns = editValues.patterns.slice()
            newPatterns.push('')
            return { ...editValues, patterns: newPatterns }
          })
        }}
      >
        add new patter
      </div>

      <div>responses:</div>
      {editValues?.responses?.map((response, i) => {
        return (
          <input
            value={response}
            onChange={(e) => {
              setEditValues((editValues) => {
                return {
                  ...editValues,
                  responses: editValues.responses.map((zone, x) => {
                    if (x === i) {
                      return e.target.value
                    } else {
                      return zone
                    }
                  }),
                }
              })
            }}
          />
        )
      })}
      <div
        onClick={() => {
          setEditValues((editValues) => {
            let newResponses = editValues.responses.slice()
            newResponses.push('')
            return { ...editValues, responses: newResponses }
          })
        }}
      >
        add new response
      </div>
    </div>
  )
}

export default Settings
