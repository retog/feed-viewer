export function getAuthorName(feedId) {
  const opts = {
    limit: 1,
    reverse: true,
    query: [
      {
        $filter: {
          value: {
            author: feedId,
            content: {
              type: 'about',
              about: feedId,
              name: { $is: 'string' } // there's a name string present
            }
          },
          timestamp: { $gt: 0 } // a hack that forces ordering by timestamp
        }
      },
      {
        $map: {
          name: ['value', 'content', 'name']
        }
      }
    ]
  }
  
  return new Promise((resolve, reject) =>
    pull(
      sbot.query.read(opts),
      pull.collect((err, results) => {
        if (err) {
          reject(err)
          return
        }

        var name
        if (!results || !results.length) name = feedId
        else name = results[0].name
        resolve(name)
      })
    )
  )
}

export default function getAuthors() {
  const retunedIds = {}

  const opts = {
    limit: 1000,
    reverse: true,
    query: [
      {
        $filter: {
          value: {
            content: {
              type: 'about',
              name: { $is: 'string' }
            }
          },
          timestamp: { $gt: 0 } // a hack that forces ordering by timestamp
        }
      },
      {
        $map: {
          feedId: ['value', 'author'],
          name: ['value', 'content', 'name'],
          about: ['value', 'content', 'about']
        }
      }
    ]
  }

  return pull(
    sbot.query.read(opts),
    pull.filter(msg => msg.feedId === msg.about), //only considering self assigned names
    pull.filter(msg => {
      const first = !retunedIds[msg.feedId]
      retunedIds[msg.feedId] = true
      return first
    })
  )
}
