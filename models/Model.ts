import Http from "@/models/Http";

export default class Model {
  public id!: string;

  public created_at!: string;

  public updated_at!: string;

  protected endpoint = "/";

  public async all(): Promise<this[]> {
    const response = await Http.get(this.endpoint);
    return response.data;
  }

  public async find(id: string | number): Promise<this> {
    const response = await Http.get(`${this.endpoint}/${id}`);
    return response.data;
  }
}
