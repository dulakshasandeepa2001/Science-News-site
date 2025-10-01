import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const CleopatraSunkenPortDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/cleopatra-sunken-port-discovery')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about Sunken Port Discovery That May Hold Clues to Cleopatra's Tomb
    </Button>
  );
};

export default CleopatraSunkenPortDirectLink;
