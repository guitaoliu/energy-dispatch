export default (baudRate: number): string =>
  baudRate === 1000 ? `${baudRate}kbit/s` : `1Mbit/s`
