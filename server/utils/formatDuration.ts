export default function formatDuration(minutes: number): string {
  if (minutes % 60 === 0 && minutes >= 60) {
    const hours = minutes / 60
    return `${hours} hour${hours > 1 ? 's' : ''}`
  }
  return `${minutes} minutes`
}
