export function formatMinMaxAges(minAge: number, maxAge: number) {
    if (maxAge > 99) return `${minAge}+ år`
    return `${minAge}-${maxAge} år`
}