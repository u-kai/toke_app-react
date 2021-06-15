import { BackendResultsChaster } from 'model/BackendResultsChaster'
import { BackendReturn } from 'types/backend-return-tyeps/BackendReturn'
import { SQLError } from 'types/backend-return-tyeps/SQLError'
const errorResults: BackendReturn = {
    status: 400,
    results: {
        error: { code: '400', sqlMessage: 'error test', sqlState: '', errno: 0 },
    },
}
const backendResultsChaster = new BackendResultsChaster(errorResults)
const chastError = backendResultsChaster.chastError()

const isError = (data: any): data is SQLError => {
    return data.status === 400 && data.results.error !== undefined
}

it('test error chast', () => {
    expect(isError(chastError)).toBe(true)
})
