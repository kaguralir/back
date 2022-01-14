import { createConnection, getManager, getConnection } from "typeorm";

import { User } from "./../src/entity/user_entity"
/**
 * Petite fonction qui met en place une base de données de test en mémoire avec
 * sqlite (et plus spécifiquement la library better-sqlite3).
 * Cette db sera recréée avant chaque test et supprimer après chaque test, il faut donc
 * faire également en sorte d'y mettre des données de test si c'est nécessaire (les fonctions
 * de fixtures servent à ça)
 */
export function setUpTestDatabase() {

    beforeEach(async () => {
        await createConnection({
            type: 'better-sqlite3',
            database: ':memory:',
            synchronize: true,
            entities: ['src/entity/*.ts'],
            dropSchema: true
        });
        await userFixtures();

    });

    afterEach(async () => {
        await getConnection().close()
    })
}
/**
 * Fonction qui fait persister des personnes pour les tests. Il faudra la lancer
 * avant chaque test et en créer d'autres pour les autres entités à tester.
 */
async function userFixtures() {
    await getManager().insert(User, [
        { demo: 0, name: 'Test1', role: "company", email: "newemil", password: "newpassword" },
        { demo: 0, name: 'Test2', role: "company", email: "newemil", password: "newpassword" },
        { demo: 0, name: 'Test3', role: "company", email: "newemil", password: "newpassword" },
    ]);
}


