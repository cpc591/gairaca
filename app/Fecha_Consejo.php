<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Fecha_Consejo extends Model
{
    public $timestamps = false;
    protected $table = 'fechas_consejos';

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
