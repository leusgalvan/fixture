import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Tournament, Team, User } from "../../types";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
};

const USER_COLLECTION = "user";
const TEAM_COLLECTION = "team";
const TOURNAMENT_COLLECTION = "tournament";

export class Firebase {
  private readonly provider = new app.auth.GoogleAuthProvider();
  private auth: app.auth.Auth;
  private db: app.firestore.Firestore;

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  async login() {
    const { user } = await this.auth.signInWithPopup(this.provider);

    if (!user) {
      return { error: "There was an error in the login proccess." };
    }

    await this.db
      .collection(USER_COLLECTION)
      .doc(user.uid)
      .set(
        {
          displayName: user.displayName
        },
        { merge: true }
      );

    return { user };
  }

  onInitialize(callback: () => void) {
    this.auth.onAuthStateChanged(callback);
  }

  logout() {
    return this.auth.signOut();
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  async fetchAllTeams() {
    const snapshot = await this.db.collection(TEAM_COLLECTION).get();
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Team));
  }

  async saveTournament(tournament: Omit<Tournament, "id">) {
    const result = await this.db
      .collection(TOURNAMENT_COLLECTION)
      .add(tournament);
    return result;
  }

  async fetchTournamentById(idTournament: string): Promise<Tournament> {
    const result = await this.db
      .collection(TOURNAMENT_COLLECTION)
      .doc(idTournament)
      .get();

    const tournament = result.data() as Tournament;

    return { ...tournament, id: result.id };
  }

  async addTeam(newTeam: Omit<Team, "id">) {
    const ref = await this.db.collection(TEAM_COLLECTION).add(newTeam);
    return ref.id;
  }

  async fetchAllUsers() {
    const snapshot = await this.db.collection(USER_COLLECTION).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
  }
}

export default new Firebase();
