import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const RussiaEnteromixVaccineDirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/russia-enteromix-vaccine')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about Russia's Cancer Treatment Vaccine
    </Button>
  );
};

export default RussiaEnteromixVaccineDirectLink;
