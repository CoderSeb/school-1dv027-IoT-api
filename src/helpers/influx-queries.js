import { InfluxDB } from '@influxdata/influxdb-client'
import dotenv from 'dotenv'
import createError from 'http-errors'
dotenv.config()
const token = process.env.INFLUXDB_TOKEN
const url = process.env.INFLUXDB_URL
const org = process.env.INFLUXDB_ORG
export const queryByField = async (field, since, interval) => {
  const client = new InfluxDB({ url, token })
  let queryClient = client.getQueryApi(org)
  const startDate = since || '1d'
  const every = interval || '1h'
  let fluxQuery = `from(bucket: "terra_temps")
	|> range(start: -${startDate})
  |> aggregateWindow(every: ${every}, fn: mean)
  |> filter(fn: (r) => r["_measurement"] == "mem")
  |> filter(fn: (r) => r["_field"] == "${field}")
  |> limit(n: 100)`

  let result = []
  const final = await queryClient
    .collectRows(fluxQuery)
    .then((rows) => {
      rows.forEach((row) => {
        if (row._value !== null) {
          const newObj = {
            time: row._time,
            value: Number(row._value.toFixed(2)),
            field: row._field
          }

          result.push(newObj)
        }
      })
      return result
    })
    .catch((err) => {
      throw createError(500, 'InfluxDB query failed')
    })
  return final
}
