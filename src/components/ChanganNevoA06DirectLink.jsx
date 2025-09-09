import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

const ChanganNevoA06DirectLink = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate('/article/changan-nevo-a06')}
      variant="outline"
      className="w-full text-left justify-start hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      Read about Changan's New Electric Vehicle
    </Button>
  );
};

export default ChanganNevoA06DirectLink;
