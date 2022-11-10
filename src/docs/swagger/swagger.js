const spec = {
  "openapi": "3.0.0",
  "info": {
    "title": "Gaming and Chatting API",
    "description": "This is a web api designed for chatting and gaming.",
    "contact": {
      "email": "you@your-company.com"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:8000",
      "description": "Gaming and Chatting web"
    }
  ],
  "paths": {
    "/messages": {
      "get": {
        "tags": [
          "Messages"
        ],
        "description": "Obtem do servidor uma mensagem (a mais antiga)\n",
        "operationId": "searchMessages",
        "parameters": [
          {
            "name": "userid",
            "in": "header",
            "description": "Identificador do usuário",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "password",
            "in": "header",
            "description": "Senha do usuário",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Mensagem",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string",
                  "example": "3825:Oi!"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "Messages"
        ],
        "summary": "Envia uma mensagem",
        "description": "Envio de mensagens",
        "operationId": "addMessage",
        "parameters": [
          {
            "name": "userid",
            "in": "header",
            "description": "Identificador do usuário",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "password",
            "in": "header",
            "description": "Senha do usuário",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "Mensagem a enviar",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Message"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created"
          }
        }
      }
    },
    "/users": {
      "get": {
        "tags": [
          "Users"
        ],
        "description": "Obtem a lista de usuários conectados\n",
        "operationId": "getUsers",
        "parameters": [
          {
            "name": "userid",
            "in": "header",
            "description": "Identificador do usuário",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "password",
            "in": "header",
            "description": "Senha do usuário",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "lista de usuários",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string",
                  "example": "2756:João da Silva:4:1235:José da Silva:0:1243:Manuel da Silva:2:"
                }
              }
            }
          }
        }
      }
    },
    "/players": {
      "get": {
        "tags": [
          "Players"
        ],
        "description": "Obtem do servidor a lista de usuários que estão participando do Jogo de Cartas 21\n",
        "operationId": "getPlayers",
        "parameters": [
          {
            "name": "userid",
            "in": "header",
            "description": "Identificador do usuário",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "password",
            "in": "header",
            "description": "Senha do usuário",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "lista de usuários participando",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string",
                  "example": "2756:PLAYING:1235:IDLE:1243:GETTING:"
                }
              }
            }
          }
        }
      }
    },
    "/cards": {
      "get": {
        "tags": [
          "Cards"
        ],
        "description": "Obtem do servidor mais uma carta\n",
        "operationId": "getCard",
        "parameters": [
          {
            "name": "userid",
            "in": "header",
            "description": "Identificador do usuário",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "password",
            "in": "header",
            "description": "Senha do usuário",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Uma carta",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string",
                  "example": "J:HEART"
                }
              }
            }
          }
        }
      }
    },
    "/game": {
      "post": {
        "tags": [
          "Game"
        ],
        "description": "Obtem do servidor mais uma carta\n",
        "operationId": "postGame",
        "parameters": [
          {
            "name": "userid",
            "in": "header",
            "description": "Identificador do usuário",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "password",
            "in": "header",
            "description": "Senha do usuário",
            "required": true,
            "style": "simple",
            "explode": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Game"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Message": {
        "type": "object",
        "properties": {
          "destinyId": {
            "type": "string",
            "example": "1416"
          },
          "message": {
            "type": "string",
            "example": "Hello"
          }
        }
      },
      "Game": {
        "type": "object",
        "properties": {
          "command": {
            "type": "string",
            "example": "ENTER"
          }
        }
      }
    }
  }
}