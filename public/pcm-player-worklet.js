/**
 * PCMPlayerProcessor
 *
 * This AudioWorkletProcessor receives interleaved PCM samples from the main thread,
 * de-interleaves them into separate left/right channel buffers, and continuously
 * outputs them to the audio hardware with zero drift or stutter.
 *
 * The circular buffer ensures we can handle network jitter by buffering samples
 * before playback.
 */

class PCMPlayerProcessor extends AudioWorkletProcessor {
  constructor() {
    super();

    // Circular buffers for left and right channels
    this.bufferL = new Float32Array(44100 * 4); // 3 seconds at 48kHz
    this.bufferR = new Float32Array(44100 * 4);

    // Index pointers
    this.writeIndex = 0; // where new samples are written
    this.readIndex = 0; // where samples are read for playback
    this.availableSamples = 0; // how many samples are currently buffered

    // Listen for messages from main thread
    // Expect { samples: Float32Array } where samples are interleaved stereo
    this.port.onmessage = (event) => {
      const { samples } = event.data;

      // De-interleave samples into left/right buffers
      for (let i = 0; i < samples.length / 2; i++) {
        this.bufferL[this.writeIndex] = samples[i * 2]; // left channel
        this.bufferR[this.writeIndex] = samples[i * 2 + 1]; // right channel

        this.writeIndex++;
        if (this.writeIndex >= this.bufferL.length) this.writeIndex = 0;
      }

      // Update available samples, capped at buffer length
      this.availableSamples = Math.min(
        this.availableSamples + samples.length / 2,
        this.bufferL.length
      );
    };
  }

  /**
   * process()
   *
   * Called automatically by the audio thread to fill the output buffers.
   *
   * @param {Float32Array[][]} _inputs - ignored (we have no input nodes)
   * @param {Float32Array[][]} outputs - outputs[0][channel][frame]
   * @returns {boolean} true to keep processor alive
   */
  process(_inputs, outputs) {
    const output = outputs[0]; // outputs[0] is our stereo output [channel][frame]
    const frames = output[0].length; // number of frames we need to fill

    for (let i = 0; i < frames; i++) {
      if (this.availableSamples > 0) {
        // Write left and right channels
        output[0][i] = this.bufferL[this.readIndex];
        output[1][i] = this.bufferR[this.readIndex];

        // Advance read pointer and decrement available samples
        this.readIndex++;
        this.availableSamples--;
        if (this.readIndex >= this.bufferL.length) this.readIndex = 0;
      } else {
        // Buffer underrun → output silence
        output[0][i] = 0;
        output[1][i] = 0;
      }
    }

    return true; // keep processor alive
  }
}

// Register the processor under the name "pcm-player"
registerProcessor("pcm-player", PCMPlayerProcessor);
