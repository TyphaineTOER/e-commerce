<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;

class UserController extends ApiController
{
    /**
     * @Route("/users", methods="GET")
     */
    public function index($userRepository)
    {
        $users = $userRepository->transformAll();

        return $this->respond($users);
    }

    /**
     * @Route("/users", methods="POST")
     */
    public function create(Request $request, UserRepository $userRepository,UserPasswordEncoderInterface $passwordEncoder, GuardAuthenticatorHandler $guardHandler, EntityManagerInterface $em)
    {
        $request = $this->transformJsonBody($request);
        if (!$request) {
            return $this->respondValidationError('Please provide a valid request!');
        }

        // validate the title
        if (!$request->get('name')) {
            return $this->respondValidationError('Please provide a name!');
        }
        if (!$request->get('mail')) {
            return $this->respondValidationError('Please provide a mail!');
        }
        if (!$request->get('password')) {
            return $this->respondValidationError('Please provide a password!');
        }
        if (!$request->get('password2')) {
            return $this->respondValidationError('Please confirm your password!');
        }

        if ($request->get('password') != ($request->get('password2'))) {
            return $this->respondValidationError('Passwords mutch match !');
        }

        // persist the new user
        $user = new User;
        $user->setEmail($request->get('mail'));
        $user->setPassword($request->get('password')
        );
        $user->setRole($request->get('role'));
        $user->setRoles(['ROLE_USER']);
        $em->persist($user);
        $em->flush();

        return $this->respondCreated($userRepository->transform($user));
    }

    /**
     * @Route("/login", methods="POST")
     */
    public function login(Request $request, UserRepository $userRepository, EntityManagerInterface $em)
    {
        $request = $this->transformJsonBody($request);
        if (!$request) {
            return $this->respondValidationError('Please provide a valid request!');
        }

        if (!$request->get('mail')) {
            return $this->respondValidationError('Please provide a mail!');
        }
        if (!$request->get('password')) {
            return $this->respondValidationError('Please provide a password!');
        }

        // persist the new user
        $credentials = [
            'email' => $request->get('mail'),
            'password' => $request->get('password'),
        ];
        $users = $userRepository->checkUser($credentials);

        return $this->respondCreated($users);

    }
}
