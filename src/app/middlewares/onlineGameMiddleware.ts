import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Middleware } from '@reduxjs/toolkit';
import { Global } from 'constants/global';
import { actions as gameActions } from 'app/services/game/slice';
import { actions as playerActions } from 'app/services/player/slice';
import { GameDto } from 'app/services/game/types';

const buildConnection = (gameId : string) => {
  const hubConnection = new HubConnectionBuilder()
    .withUrl(`${process.env.REACT_APP_API_URL}/hubs/liveGame?gameId=${gameId}`, { accessTokenFactory: () => localStorage.getItem(Global.AUTH_KEY) || '' })
    .withAutomaticReconnect([ 0,0,5000 ])
    .build();

  return hubConnection;
};

const connect = (gameId : string) => {
  const connection = buildConnection(gameId);

  try{
    connection.start();
  }catch{
    console.warn('Something went wrong');
  }

  return connection;
};

const disconnect = (connection: any) => {
  if (!connection) return;
  connection.stop();

};

const subscribe = (store : any, connection: any) => {
  if (!connection) return;

  connection.on('personJoined', (data: number) => {
    store.dispatch(gameActions.setViewersCounts(data));
  });
  connection.on('personLeft', (data: any) => {
    store.dispatch(gameActions.setViewersCounts(data));
  });

  connection.on('connected', (data: any) => {
    store.dispatch(gameActions.setViewersCounts(data));
  });

  connection.on('playerDataChanged', (teamId : any, gameId : any, dto : any, changedData: any) => {
    store.dispatch(gameActions.setPlayerDataChanged({ playerInGame : dto, changedData: changedData }));
    store.dispatch(playerActions.setPlayerData({ teamId, gameId, result: dto, changedData }));
  });
  connection.on('gameScoreChanged', (gameId : any, setDto : any) => {
    store.dispatch(gameActions.setGameCurrentSet(setDto));
  });

  connection.on('gameStarted', (game: any, setDto: any) => {
    store.dispatch(gameActions.setGame(game));
    store.dispatch(gameActions.setGameCurrentSet(setDto));

  });

  connection.on('startNewSet', (gameId: any, setDto: any) => {
    store.dispatch(gameActions.setNewSet(setDto));
  });

  connection.on('endGame', (game : GameDto) => {
    store.dispatch(gameActions.endGame(game));
  });

  connection.on('playersChanged', (teamId : any, playersInGameDto : any) => {
    store.dispatch(playerActions.setPlayers({ teamId, result: playersInGameDto }));
  });
};


export const onlineGameMiddleware : Middleware = (store: any) => {
  let connection : HubConnection | null = null;

  return next => action => {

    if (gameActions.setConnect.match(action)) {
      const { gameId } = action.payload;
      connection = connect(gameId);
      subscribe(store, connection);
    }
    if (gameActions.setDisconnect.match(action)) {
      disconnect(connection);
      connection = null;
    }

    return next(action);
  };
};

