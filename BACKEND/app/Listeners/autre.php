<?php

namespace App\Listeners;

use App\Models\Bill;
use App\Models\Offer;
use App\Models\Reservation;
use Illuminate\Support\Facades\DB;
use App\Events\MonthlyBillingEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class MonthlyBillingListener implements ShouldQueue
{
    /**
     * Handle the event.
     */
    // public function handle(MonthlyBillingEvent $event): void
    // {
    //     try {
    //         $reservations_by_host = Reservation::join('offers', 'reservations.offer_id', '=', 'offers.id')
    //             ->select('offers.host_id', DB::raw('count(*) as reservation_count'))
    //             ->whereMonth('reservations.created_at', now()->month)
    //             ->whereYear('reservations.created_at', now()->year)
    //             ->groupBy('offers.host_id')
    //             ->get();

    //         foreach ($reservations_by_host as $bill_data) {
    //             $host_id = $bill_data->host_id;
    //             $reservation_count = $bill_data->reservation_count;

    //             $total = $reservation_count * 10;

    //             DB::beginTransaction();

    //             try {
    //                 Bill::create([
    //                     'host_id' => $host_id,
    //                     'total' => $total,
    //                 ]);

    //                 $offerIds = Offer::where('host_id', $host_id)->pluck('id');
    //                 Reservation::whereIn('offer_id', $offerIds)->update(['billed' => true]);

    //                 DB::commit();
    //             } catch (\Exception $e) {
    //                 DB::rollback();
    //                 throw $e; 
    //             }
    //         }
    //         info("Reservation of " + now()->month + "/" + now()->year + " billed");
    //     } catch (\Exception $exception) {
    //         info("An error occurred while processing MonthlyBillingEvent: " . $exception->getMessage());
    //     }
    // }
}