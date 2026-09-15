type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center px-4 md:px-0">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-[1.25rem] font-semibold">TeamFlow</h1>

        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
