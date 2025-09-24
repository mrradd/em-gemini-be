export class AssitantModel {
  constructor() {
    this.id = ""; //UUID string
    this.name = ""; //string
    this.system_instructions = ""; //string
    this.created_date = ""; //string
    this.updated_date = ""; //string
  }
}

export class Map_ChatThread__Assistant_Model {
  constructor() {
    this.chatThreadId = ""; //UUID string
    this.assistantId = ""; //UUID string
  }
}

export class ChatDataModel {
  constructor() {
    this.id = ""; //UUID string
    this.chat_thread_id = ""; //UUID string
    this.prompt = ""; //string
    this.response = ""; //string
    this.blob = null; //any. Initing to null; I don't know what a blob looks like when returned from the db. MAX 1GB.
    this.prompt_tokens = 0; //number
    this.response_tokens = 0; //number
    this.thinking_tokens = 0; //number
    this.created_date = ""; //string
  }
}

export class ChatThreadModel {
  constructor() {
    this.id = ""; //UUID string
    this.title = ""; //string
    this.created_date = ""; //string
    this.updated_date = ""; //string
    this.chats = []; //ChatDataModel[]
  }
}

export class Migrations {
  constructor() {
    this.id = "" //UUID string
    this.date = ""; //string
    this.version_number = ""; //number as string
  }
}