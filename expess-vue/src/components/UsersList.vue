<template>
    <h3 v-if="msg">{{ msg }}</h3>
    <table>
        <caption>La liste des utilisateurs</caption>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Âge</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tfoot v-if="user.username">
            <tr>
                <th><span>Connecté(e)</span>: <br>{{ user.username }}</th>
                <th>{{ user.age }}</th>
                <th>{{ user.email }}</th>
            </tr>
        </tfoot>
        <tbody>
            <tr v-for="(elt, index) in filteredUsers" :key="index">
                <td>{{ elt.username }}</td>
                <td>{{ elt.age }}</td>
                <td>{{ elt.email }}</td>
                <td>
                    <button @click="updateUser(elt.id)" class="update" type="button">Update</button>
                    <button @click="deleteUsers(elt.id)" class="delete" type="button">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { userService } from "@/services/users.service";
import { userStore } from '@/store/users.store';
import { useRouter,useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { onMounted, ref, computed } from 'vue';

const users = ref([]);
const router = useRouter();
const route = useRoute();
const msg = ref(''); // Définir msg comme une ref

// Store Pinia
const store = userStore();
const { user } = storeToRefs(store);

// Fonction pour récupérer les utilisateurs
const fetchUsers = async () => {
    await store.fetchUser();
    const res = await userService.getAllUsers();
    users.value = res.data;
};

// Filtrer les utilisateurs pour exclure l'utilisateur connecté
const filteredUsers = computed(() => {
    return users.value.filter(elt => elt.username !== user.value.username);
});

// Fonction pour rediriger vers la page de mise à jour
const updateUser = (userId) => {
    console.log('Update user with ID:', userId);

    // Rediriger vers la page /updateUser avec userId comme paramètre de requête
    router.push({ name: 'updateUser', query: { id: userId } });
};

// Fonction pour supprimer un utilisateur
const deleteUsers = async (userId) => {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");

    if (confirmation) {
        // Si l'utilisateur confirme, continuez avec la suppression
        try {
            console.log('Delete user with ID:', userId);
            const delt = await userService.deleteUsers(userId);

            // Recharger les utilisateurs après la suppression
            if (delt) {
                await fetchUsers();
            }

            msg.value = delt.data.message; // Mettre à jour le message
            //vider le message apres 1s
            setTimeout(() => {
                msg.value = '';

            },3000)
        } catch (error) {
            console.error('Error deleting user:', error);
            msg.value = 'Erreur lors de la suppression de l\'utilisateur.';
        }
        console.log("Élément supprimé.");
    } else {
        // Sinon, annulez la suppression
        console.log("Suppression annulée.");
    }

};

// Gestion du montage du composant
onMounted(() => {
    // Récupérer le message si disponible depuis les query params
    if (route.query.message) {
        msg.value = route.query.message;


        // Supprimer le paramètre 'message' de l'URL pour éviter qu'il persiste après le rechargement
        router.replace({ query: { ...route.query, message: undefined } });
        //vider le message apres 1s
        setTimeout(() => {
            msg.value = '';

        }, 2000)
    }

    // Récupérer la liste des utilisateurs
    fetchUsers();
});

</script>

<style scoped>
td {
    border: 1px solid black;
    font-size: x-large;
}

table {
    margin-left: 300px;
}

thead th {
    border: 3px solid blue;
    font-size: x-large;
}

tfoot th {
    border: 3px solid rgb(106, 171, 92);
    font-size: x-large;
}

span {
    color: green;
}

button {
    display: block;
    margin: 10px;
    padding: 10px;
    background-color: snow;
    border-radius: 10px;
    width: 100px;
    font-size: 20px;
    cursor: pointer;
}

button:hover {
    background-color: antiquewhite;
    width: 110px;
}

.delete {
    color: red;
}

.update {
    color: green;
}

h3 {
    color: green;
}
</style>
