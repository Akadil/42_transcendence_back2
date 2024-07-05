# Pong / Tennis game architecture

## API endpoint - room management ('/game')

- POST('create') - create a room
    - Params:
        - gameMode: GameModeStates
        - playerOneId: string
        - playerTwoId: string
    - Response:
        - success: bool
        - message: string
        - id: string
- POST('join')
    - Params:
        - id: string
    - Response:
        - success: bool
        - message: string
- GET(':id')
    - playerOneId: string
    - playerTwoId: string
    - gameState
    - gameMode: GameModeStates
    - spectators: []
        - spctatorId
- GET('profile') - get your info
    - roomId: string | null
- GET('all') - get all available games
    - rooms: []
        - roomId: string
        - playerOneId: string
        - playerOneUname: string
- DELETE(':id')
    - success: bool
    - message: string
- UPDATE(':id/leave')
- UPDATE(':id/kick')
    - spectatorId: string


## Websocket - live game ('/game')

- POST('connection')
    - Parameters:
        - id: string - roomId to join
    - Return:
        - playerOne: string
        - playerTwo: string
        - spectators: []
            - username: string
- POST('disconnection')
- POST('handle_event')
    - button: string
    - state: ButtonState
- POST('message')
    - message: string - message to send to the room

### Receivers:
- GET('message')
    - message: string
    - username: string
- GET('joined')
    - username: string
- GET('game_state)
    - playerOne: Position
    - playerTwo: Position
    - ball: Position

---
### Annotation
```typescript
GameModeStates {
    ...
}

ButtonState {
    UP: up,
    DOWN: down,
    HOVER: hover,
}

Position {
    x: number,
    y: number,
}
```
