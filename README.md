# Climate Action Pledge

This project is a web application where users can take a climate action pledge, receive a digital certificate, and see their impact reflected on a live dashboard.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Supabase Integration](#supabase-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Take a Pledge:** Users can commit to climate action.
- **Digital Certificate:** Receive a personalized certificate upon pledging.
- **Live Impact Dashboard:** View real-time KPIs and the collective impact of pledges.
- **Pledge Wall:** See a scrollable wall of recent pledges.
- **Animated Counters:** Engaging visuals for key metrics.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- Supabase (for backend and database)
- Lucide React (for icons)

## Setup and Installation

To get this project up and running locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/climate-action.git
    cd climate-action
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Supabase:**

    Refer to the [Supabase Integration](#supabase-integration) section for detailed setup.

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Supabase Integration

This project uses Supabase for its backend, including database, authentication, and edge functions. 

### 1. Create a Supabase Project

If you don't have one, create a new project on the [Supabase website](https://app.supabase.com/).

### 2. Configure Environment Variables

Create a `.env` file in the root of your project based on `.env.example` (if provided, otherwise create these manually):

```env
VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

You can find these values in your Supabase project settings under `API`. Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual Supabase project URL and public anon key.

### 3. Deploy to Vercel (Environment Variables)

To deploy your project to Vercel, you need to set the Supabase environment variables in your Vercel project settings:

1.  Go to your Vercel Project Settings.
2.  Navigate to the "Environment Variables" section.
3.  Add the following environment variables:

    -   **For `VITE_SUPABASE_URL`:**
        -   **Key:** `VITE_SUPABASE_URL`
        -   **Value:** Copy the `Project URL` from your Supabase Project API settings (e.g., `https://[your-project-id].supabase.co`).

    -   **For `VITE_SUPABASE_ANON_KEY`:**
        -   **Key:** `VITE_SUPABASE_ANON_KEY`
        -   **Value:** Copy the `anon public` key from your Supabase Project API settings.
        -   **Warning:** *NEVER* use the `service_role` secret key. This key is for your server only and must be kept private. Exposing it in Vercel (or any frontend code) is a major security risk.

4.  Click "Save".
5.  Go to your "Deployments" tab and Redeploy your project.

### 4. Run Migrations

This project includes a Supabase migration file to set up the `pledges` table. You can find it under `supabase/migrations/20251028112418_create_pledges_table.sql`.

To apply this migration to your Supabase project, you can use the Supabase CLI:

```bash
supabase db push
```

Make sure you have the [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started) installed and configured with your project.

### 5. Database Schema

The `20251028112418_create_pledges_table.sql` migration creates the following table:

```sql
-- supabase/migrations/20251028112418_create_pledges_table.sql
CREATE TABLE public.pledges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  pledge_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  country TEXT,
  comment TEXT
);

ALTER TABLE public.pledges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public pledges are viewable by everyone." ON public.pledges FOR SELECT USING (TRUE);
CREATE POLICY "Users can insert their own pledges." ON public.pledges FOR INSERT WITH CHECK (TRUE);
```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.