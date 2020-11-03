import * as mongoose from 'mongoose';
import { schemaSanitizer } from '../../helpers/schema-sanitizer';

const playerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  currentPoints: { type: Number, required: true, default: 0 },
  ableToStartGame: { type: Boolean, default: false },
});

const selectedCardSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cardText: { type: String, required: true },
});

const roundSchema = new mongoose.Schema({
  selector: { type: String, default: null },
  mainCardText: { type: String, default: null },
  mainCardGaps: { type: String, default: null },
  currentlySelectedCards: { type: [selectedCardSchema], default: [] },
});

const schema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  players: { type: [playerSchema], required: true, default: [] },
  createdAt: { type: Date, default: Date.now },
  currentRound: {
    type: roundSchema,
    default: {
      selector: null,
      mainCardText: null,
      mainCardGaps: null,
      currentlySelectedCards: [],
    },
  },
});

export const RoomSchema = schemaSanitizer(schema);
