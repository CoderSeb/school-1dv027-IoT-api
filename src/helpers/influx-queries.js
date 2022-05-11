import { InfluxDB } from '@influxdata/influxdb-client'
import dotenv from 'dotenv'
dotenv.config()
const token = process.env.INFLUXDB_TOKEN
const url = process.env.INFLUXDB_URL
const org = `sebbeakerblom@gmail.com`
export const queryByField = async (field) => {
  const client = new InfluxDB({ url, token })
  let queryClient = client.getQueryApi(org)
  let fluxQuery = `from(bucket: "terra_temps")
	|> range(start: -1d)
  |> aggregateWindow(every: 15m, fn: mean)
  |> filter(fn: (r) => r["_measurement"] == "mem")
  |> filter(fn: (r) => r["_field"] == "${field}")`

  let result = []
  const final = await queryClient.collectRows(fluxQuery).then((rows) => {
    rows.forEach(row => {
      if (row._value !== null) {
        const newObj = {
          time: row._time,
          value: row._value,
          field: row._field
        }

        result.push(newObj)
      }
    })
    return result
  }).catch(err => {
    console.log(err)
  })
  return final
}
