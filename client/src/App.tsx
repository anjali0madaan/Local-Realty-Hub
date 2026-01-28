import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router({ showAddDialog, onShowAddDialogChange }: { showAddDialog: boolean; onShowAddDialogChange: (show: boolean) => void }) {
  return (
    <Switch>
      <Route path="/">
        <Home showAddDialog={showAddDialog} onShowAddDialogChange={onShowAddDialogChange} />
      </Route>
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="propertyhub-theme">
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Header onAddProperty={() => setShowAddDialog(true)} />
            <main className="flex-1">
              <Router showAddDialog={showAddDialog} onShowAddDialogChange={setShowAddDialog} />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
