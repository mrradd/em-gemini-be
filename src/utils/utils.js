export class Utils {
  static generateNowDateString() {
    const date = new Date();
    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
  }
}