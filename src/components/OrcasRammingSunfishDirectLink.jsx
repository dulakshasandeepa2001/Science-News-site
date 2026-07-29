import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const OrcasRammingSunfishDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/orcas-ramming-sunfish')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about Orcas Observed Ramming Sunfish into Pieces
    </Button>
  );
};

export default OrcasRammingSunfishDirectLink;
