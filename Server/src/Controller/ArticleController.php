<?php
namespace App\Controller;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

class ArticleController extends ApiController
{
    /**
    * @Route("/articles", methods="GET")
    */
    public function index(ArticleRepository $articleRepository)
    {
        if (! $this->isAuthorized()) {
            return $this->respondUnauthorized();
        }
        
        $articles = $articleRepository->transformAll();

        return $this->respond($articles);
    }

    /**
    * @Route("/articles", methods="POST")
    */
    public function create(Request $request, ArticleRepository $articleRepository, EntityManagerInterface $em)
    {
        if (! $this->isAuthorized()) {
            return $this->respondUnauthorized();
        }
        
        $request = $this->transformJsonBody($request);
        if (! $request) {
            return $this->respondValidationError('Please provide a valid request!');
        }

        // validate the name
        if (! $request->get('name')) {
            return $this->respondValidationError('Please provide a title!');
        }

        // persist the new article
        $article = new Article;
        $article->setName($request->get('name'));
        $article->setCount(0);
        $em->persist($article);
        $em->flush();

        return $this->respondCreated($articleRepository->transform($article));
    }

    /**
    * @Route("/articles/{id}/count", methods="POST")
    */
    public function increaseCount($id, EntityManagerInterface $em, ArticleRepository $articleRepository)
    {
        if (! $this->isAuthorized()) {
            return $this->respondUnauthorized();
        }
        
        $article = $articleRepository->find($id);

        if (! $article) {
            return $this->respondNotFound();
        }

        $article->setCount($article->getCount() + 1);
        $em->persist($article);
        $em->flush();

        return $this->respond([
            'count' => $article->getCount()
        ]);
    }
}