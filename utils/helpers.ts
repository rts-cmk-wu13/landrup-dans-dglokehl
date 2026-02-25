export function formatMinMaxAges(minAge: number, maxAge: number) {
    if (maxAge > 99) {
        if (minAge < 1) return "Alle aldre"
        return `${minAge}+ år`
    }
    return `${minAge}-${maxAge} år`
}