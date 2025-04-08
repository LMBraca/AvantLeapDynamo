import { Dropbox } from "dropbox";

export class DropboxTokenManager {
  private clientId: string;
  private clientSecret: string;
  private refreshToken: string;
  private accessToken: string;

  constructor(
    clientId: string,
    clientSecret: string,
    refreshToken: string,
    initialAccessToken: string
  ) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.refreshToken = refreshToken;
    this.accessToken = initialAccessToken;
  }

  // Returns a Dropbox client instance that is configured with auto-refresh.
  getDropboxClient(): Dropbox {
    return new Dropbox({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    });
  }
}
