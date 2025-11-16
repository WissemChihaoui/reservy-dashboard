import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ForbiddenIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';
import { Button } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export function RoleBasedGuard({ sx, children, hasContent, currentRole, acceptRoles }) {
  const navigate = useRouter();
  if (typeof acceptRoles !== 'undefined' && !acceptRoles.includes(currentRole)) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Accès refusé
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Vous n&apos;avez pas la permission d&apos;accéder à cette page.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Button
            size="large"
            variant="contained"
            startIcon={<Iconify icon="pajamas:go-back" />}
            onClick={() => navigate.back()}
          >
            Retour
          </Button>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
