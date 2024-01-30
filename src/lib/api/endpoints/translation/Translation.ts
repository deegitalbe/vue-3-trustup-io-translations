import { Client, Request } from "@henrotaym/api-client";
import { TranslationFileCredential } from "../../credentials";


class Translation {
  private client: Client;

  constructor() {
    this.client = new Client().setCredential(new TranslationFileCredential());
  }

  public async index(appName: string) {
    const request = new Request()
      .setVerb("GET")
      .setUrl(`storage/translations/${appName}.json`);
    const response = await this.client.try(request);

    if (response.failed()) {
      return this.readJsonFile(appName)
        .then((jsonData) => {
          return jsonData;
        })
        .catch((error) => {
          return;
        });
    }

    return response.get();
  }

  private async readJsonFile(appName: string) {
    let jsonData = null;
    await fetch(`/${appName}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      jsonData = data
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du fichier JSON:", error);
    });

    return jsonData;
  }
}
export default Translation;
