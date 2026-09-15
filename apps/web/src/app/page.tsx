import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-280 flex-col px-4 md:px-8">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-semibold">
            TeamFlow
          </Link>

          <Link href="/login">Sign in</Link>
        </nav>

        <section className="mx-auto mt-16 flex max-w-184 flex-1 flex-col pb-8 text-center md:mt-28">
          <h1 className="text-[2.5rem] leading-[1.1] font-bold md:text-[3.5rem] md:leading-[1.05]">
            Collaborate. Plan. Ship.
          </h1>

          <p className="text-muted-foreground mx-auto mt-6 max-w-152 text-lg leading-7">
            Plan projects, manage tasks, and keep your team in sync — all in one workspace.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 md:flex-row">
            <Button className="w-full md:w-auto" size="lg">
              Get started
            </Button>

            <Button className="w-full md:w-auto" size="lg" variant="outline">
              Explore workspace
            </Button>
          </div>

          <div className="mt-auto">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle className="text-base font-semibold">System status</CardTitle>
              </CardHeader>

              <CardContent className="[&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:py-3">
                <div>
                  <span>Backend</span>
                  <Badge variant="outline">Offline</Badge>
                </div>

                <div className="border-t">
                  <span>Database</span>
                  <Badge variant="outline">Not checked</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
