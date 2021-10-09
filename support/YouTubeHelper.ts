export class YouTubeHelper {
  protected regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

  public embedUrlFromUrl(url: string): string {
    const match = url.match(this.regex);
    return match && match[7] ? `https://www.youtube.com/embed/${match[7]}` : "";
  }
}
