export class Endpoint {
  public name: string;
  public url: string;
  public streamUrl: string;

  constructor(name, url, streamUrl) {
    this.name = name;
    this.url = url;
    this.streamUrl = streamUrl;
  }
}
