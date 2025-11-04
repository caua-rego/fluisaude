import { Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background py-8 px-4 md:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-2xl font-bold text-foreground">FluiSaúde</h3>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} FluiSaúde. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
