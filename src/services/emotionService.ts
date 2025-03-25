import api from "./httpInstance";

export interface IEmotionFilter {
  start_date: string | Date | null;
  end_date: string | Date | null;
  gender: "male" | "female" | "all";
  location: "Istanbul" | "Ankara" | "Izmir" | "Bursa" | "Adana" | "all";
  age: string | null;
}
class EmotionService {
  getEmotionsData(filters: IEmotionFilter): Promise<boolean> {
    return api.get("/emotions", { params: filters });
  }
}

export default new EmotionService();
