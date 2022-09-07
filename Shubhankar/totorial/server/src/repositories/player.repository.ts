import {getRepository} from "typeorm";
import {Player} from "../models/player"

export interface IPlayerPayload {
  title: string;
  tutorialId: number;
}

export const createPlayer  = async (payload: IPlayerPayload) :Promise<Player> => {
  const playerRepository = getRepository(Player);
  const play = new Player()
  return playerRepository.save({
    ...play,
    ...payload
  })
}
export const getPlayers  = async () :Promise<Array<Player>> => {
  const playerRepository = getRepository(Player);
  return playerRepository.find()
}
export const getPlayer  = async (id: number) :Promise<Player | null> => {
  const playersRepository = getRepository(Player);
  const players = await playersRepository.findOne({id: id})
  if (!players) return null
  return players
}
