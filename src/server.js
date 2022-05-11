import express from 'express'

const main = async () => {
  const server = express()
  const port = process.env.PORT || 5000
  server.get('/', (req, res) => {
    res.send('Hello World!')
  })

  server.listen(port, (req, res) => {
    console.log(`Server is running @ http://localhost:${port}`)
  })
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})