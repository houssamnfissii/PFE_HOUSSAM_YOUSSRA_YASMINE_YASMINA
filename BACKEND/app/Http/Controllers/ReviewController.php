<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\Review;
use App\Models\Tour;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function addReview(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'offer_id' => 'required|exists:offers,id',
            'rating' => 'required|integer|min:1|max:5',
            'body' => 'required|string',
        ]);

        $review = new Review();
        $review->client_id = $validatedData['client_id'];
        $review->offer_id = $validatedData['offer_id'];
        $review->rating = $validatedData['rating'];
        $review->body = $validatedData['body'];

        $review->save();
        return response()->json(['data' => $review], 201);
    }
    public function getReviewsTopRat()
    {
        // Get the top 5 clients with the best ratings and their latest reviews
        $topRatedReviews = Review::select('client_id')
            ->selectRaw('MAX(created_at) as latest_review_date')
            ->groupBy('client_id')
            ->orderByDesc('rating')
            ->orderByDesc('latest_review_date')
            ->limit(5)
            ->get();
    
        // Extract client IDs from the results
        $clientIds = $topRatedReviews->pluck('client_id');
    
        // Retrieve the reviews for the top-rated clients
        $reviews = Review::whereIn('client_id', $clientIds)
            ->orderByDesc('created_at')
            ->with('client')
            ->get();
    
        return response()->json($reviews);
    }
    
    
    
}
