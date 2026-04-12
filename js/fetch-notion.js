const { Client } = require('@notionhq/client');
const fs = require('fs');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

async function fetchVeille() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      // On trie par la colonne "Date"
      sorts: [{ property: 'Date', direction: 'descending' }],
    });

    const articles = response.results.map(page => {
      // Récupération des catégories (gère le fait qu'il y en ait plusieurs)
      const categories = page.properties.Catégorie.multi_select.map(c => c.name);

      return {
        id: page.id,
        // On utilise tes noms de colonnes exacts
        titre: page.properties.Titre.title[0]?.plain_text || 'Sans titre',
        categories: categories, // Tableau contenant tous les tags (ex: ["Cyber", "IA"])
        date: page.properties.Date.date?.start || '',
        lien: page.properties.URL.url || '#',
        description: page.properties['Analyse IA'].rich_text[0]?.plain_text || '',
        // Récupère l'image de couverture Notion si elle existe
        image: page.cover?.external?.url || page.cover?.file?.url || 'chemin/vers/image-par-defaut.jpg'
      };
    });

    // On écrit le résultat dans le fichier veille.json
    fs.writeFileSync('veille.json', JSON.stringify(articles, null, 2));
    console.log('Données Notion mises à jour avec succès !');
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
}

fetchVeille();