
//returns a source of message-types

export default function getMessageTypes() {

  const mesageTypes = {}

  const opts = {
    limit: 1000,
    reverse: true,
    query: [
      {
        $map: {
          type: ['value', 'content', 'type']
        }
      }
    ]
  }
  console.log('pulling')
  return pull(
    sbot.query.read(opts),
    pull.map((msg => {
      return msg.type
    })),
    pull.filter(type => Boolean(type)),
    pull.filter(type => {
      const first = !mesageTypes[type]
      mesageTypes[type] = true
      return first
    })
  )

}