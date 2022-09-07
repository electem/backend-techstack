import {getManager, getRepository} from "typeorm";
import { Games } from '../models/game'
export interface IGamePayload {
  name: string;
}

export const createGame  = async (payload: IGamePayload) :Promise<Games> => {
  const gamesRepository = getRepository(Games);
  const tutorials = new Games()
  return gamesRepository.save({
  ...tutorials,
  ...payload
    })
  }

export const getGames = async (): Promise<Array<Games>> => {
  const entityManager = getManager();
  let game = [];
  const query = entityManager.createQueryBuilder(Games, "games");
    game = await query
    .select(["games", "players"])
    .leftJoinAndSelect("games.players", "players")
    .getMany();
    return game;
  };
  
export const getGame = async (id: number) => {
  const entityManager = getManager();
  let Game = [];
  const query = entityManager.createQueryBuilder(Games, "games");
  Game = await query
  .select(["games", "players"])
  .leftJoinAndSelect("games.players", "players")
  .where("games.id = :id", { id: id })
  .getMany();
  return Game;
};
  
export const updateGame  = async (payload: IGamePayload) :Promise<Games> => {
  const gameRepository = getRepository(Games);
  const update = new Games()
  return gameRepository.save({
    ...update,
    ...payload
  })
}