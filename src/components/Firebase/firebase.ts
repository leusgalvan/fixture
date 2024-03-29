import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Tournament, Team, User } from "../../types";
import { User as FirebaseUser } from "firebase/app";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

const USER_COLLECTION = "user";
const TEAM_COLLECTION = "team";
const TOURNAMENT_COLLECTION = "tournament";

interface LoginResult {
  user?: FirebaseUser;
  error?: string;
}

type Unsuscribe = () => void;

export class Firebase {
  private readonly provider = new app.auth.GoogleAuthProvider();
  private auth: app.auth.Auth;
  private db: app.firestore.Firestore;

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  async login(): Promise<LoginResult> {
    try {
      const { user } = await (process.env.NODE_ENV !== "production" &&
      process.env.TEST_USER &&
      process.env.TEST_PASS
        ? this.auth.signInWithEmailAndPassword(
            process.env.TEST_USER,
            process.env.TEST_PASS
          )
        : this.auth.signInWithPopup(this.provider));
      if (user) {
        await this.db
          .collection(USER_COLLECTION)
          .doc(user.uid)
          .set(
            {
              displayName: user.displayName,
            },
            { merge: true }
          );
        return { user };
      }
    } catch (error) {
      return { error: error.toString() };
    }
    return {};
  }

  onInitialize(callback: () => void): void {
    this.auth.onAuthStateChanged(callback);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  getCurrentUser(): firebase.User | null {
    return this.auth.currentUser;
  }

  fetchAllTeams(onTeamsFetched: (teams: Team[]) => void): Unsuscribe {
    return this.db.collection(TEAM_COLLECTION).onSnapshot(snapshot => {
      const teams = snapshot.docs.map(
        doc => ({ ...doc.data(), id: doc.id } as Team)
      );
      onTeamsFetched(teams);
    });
  }

  async saveTournament(
    tournament: Omit<Tournament, "id">
  ): Promise<app.firestore.DocumentReference> {
    const result = await this.db
      .collection(TOURNAMENT_COLLECTION)
      .add(tournament);
    return result;
  }

  async updateTournament(tournament: Tournament): Promise<void> {
    const result = await this.db
      .collection(TOURNAMENT_COLLECTION)
      .doc(tournament.id)
      .set(tournament);
    return result;
  }

  fetchTournamentById(
    idTournament: string,
    onTournamentFetched: (tournament: Tournament) => void
  ): Unsuscribe {
    return this.db
      .collection(TOURNAMENT_COLLECTION)
      .doc(idTournament)
      .onSnapshot(snapshot => {
        const tournament = {
          id: snapshot.id,
          ...snapshot.data(),
        } as Tournament;
        onTournamentFetched(tournament);
      });
  }

  async addTeam(newTeam: Omit<Team, "id">): Promise<Team> {
    const ref = await this.db.collection(TEAM_COLLECTION).add(newTeam);
    return { id: ref.id, name: newTeam.name, members: newTeam.members };
  }

  async deleteTeam(teamId: string): Promise<void> {
    return this.db
      .collection(TEAM_COLLECTION)
      .doc(teamId)
      .delete();
  }

  fetchAllUsers(onUsersFetched: (users: User[]) => void): Unsuscribe {
    return this.db.collection(USER_COLLECTION).onSnapshot(snapshot => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      onUsersFetched(users);
    });
  }

  fetchAllTournaments(
    onTournamentsFetched: (tournaments: Tournament[]) => void
  ): Unsuscribe {
    return this.db.collection(TOURNAMENT_COLLECTION).onSnapshot(snapshot => {
      const tournaments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Tournament[];
      onTournamentsFetched(tournaments);
    });
  }

  async deleteTournament(tournamentId: string): Promise<void> {
    return this.db
      .collection(TOURNAMENT_COLLECTION)
      .doc(tournamentId)
      .delete();
  }
}

export default new Firebase();
