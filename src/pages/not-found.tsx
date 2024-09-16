import { FC , HTMLAttributes} from "react";

interface NotFoundPageProps extends HTMLAttributes<'div'> {}

export const NotFoundPage: FC<NotFoundPageProps> = () => {
    return (
        <div>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      );
}