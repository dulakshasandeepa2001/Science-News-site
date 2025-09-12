import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const CyanobacteriaMarsOxygenDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/cyanobacteria-mars-oxygen')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about Cyanobacteria That Can Produce Oxygen on Mars
    </Button>
  );
};

export default CyanobacteriaMarsOxygenDirectLink;
