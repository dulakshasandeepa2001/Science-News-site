import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const EarhartNikumaroroClueDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/earhart-nikumaroro-clue')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about Clue Found on Nikumaroro Island Regarding Earhart's Disappearance
    </Button>
  );
};

export default EarhartNikumaroroClueDirectLink;
