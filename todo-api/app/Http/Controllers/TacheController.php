<?php

namespace App\Http\Controllers;

use App\Models\Tache;
use Illuminate\Http\Request;

class TacheController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(['tasks' => Tache::where('user_id', $request->user()->id)->get()]);
    }

    public function store(Request $request)
    {
        $request->validate(['title' => 'required|string|max:255']);
        $task = Tache::create([
            'title' => $request->title,
            'user_id' => $request->user()->id
        ]);
        return response()->json(['task' => $task], 201);
    }

    public function update(Request $request, $id)
    {
        $task = Tache::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $request->validate(['title' => 'required|string|max:255']);
        $task->update(['title' => $request->title]);
        return response()->json(['message' => 'Modifiée', 'task' => $task]);
    }

    public function destroy(Request $request, $id)
    {
        $task = Tache::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $task->delete();
        return response()->json(['message' => 'Supprimée']);
    }

    public function toggle(Request $request, $id)
    {
        $task = Tache::where('id', $id)->where('user_id', $request->user()->id)->firstOrFail();
        $task->completed = !$task->completed;
        $task->save();
        return response()->json(['message' => 'Tâche mise à jour', 'task' => $task]);
    }
}
