export const selectOneArray = <T>(valueArrays: T[][]): T[] => {
    const fillValueArrays = valueArrays.filter((v) => v.length > 0)
    const selectOne = fillValueArrays[0]
    return selectOne
}
