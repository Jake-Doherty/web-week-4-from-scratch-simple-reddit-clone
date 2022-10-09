const SUPABASE_URL = 'https://tybfgetbgtrxyzothjyn.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5YmZnZXRiZ3RyeHl6b3RoanluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ0MDY1MzAsImV4cCI6MTk3OTk4MjUzMH0.auIefiG5jH98P6Wl_NU4TKQnkJLjr_FPBd9mx7_3zWo';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createDefinition(definition) {
    return await client.from('definitions').insert(definition).single();
}

export async function createComment(comment) {
    return await client.from('comments').insert(comment).single();
}

export async function getDefinitions(subject, category) {
    let query = client.from('definitions').select().order('created_at').limit(100);

    if (subject) {
        query = query.ilike('subject', `%${subject}%`);
    }

    if (category) {
        query = query.eq('category', category);
    }

    const response = await query;

    return response;
}

export async function getDefinition(id) {
    return await client
        .from('definitions')
        .select('*, comments (*)')
        .eq('id', id)
        .order('created_at', { foreignTable: 'comments', ascending: false })
        .single();
}

export async function getCategories() {
    return await client.from('categories').select('name');
}

/* STORAGE FUNCTIONS */

export async function uploadImage(bucketName, imagePath, imageFile) {
    // use the storage bucket to upload the image,
    // then use it to get the public URL
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        // in this case, we will _replace_ any
        // existing file with same name.
        upsert: true,
    });

    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
        return null;
    }

    // Construct the URL to this image:
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}

/* user profiles */

export async function updateProfile(profile) {
    return await client.from('profile').upsert(profile).single();
}

export async function getProfile(id) {
    return await client.from('profile').select('*').eq('id', id).maybeSingle();
}

export async function getProfiles() {
    return await client.from('profile').select('*');
}
